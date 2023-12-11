// import db config, model, repository
const db = require("../models");
const Restaurant = db.RestaurantStockItem;
const RestaurantSale = db.RestaurantSale;
const RestaurantRepository = require("../repositories/RestaurantRepository");

// service function
const ResaurantService = () => {
    const PurchaseItem = async (Data) => {
        for (const data of Data){
            
            const {item_quantity, net_amount, item_id} = data
            // console.log(data.item_id)
            const purchaseitem = await RestaurantRepository.findRetailStockItemByID(item_id);
            
            if(!purchaseitem){
                throw new Error('Stock Not Found')
            }
            const initial_quantity = purchaseitem?.item_quantity
            
    
            if(initial_quantity == 0){
                const payload = {
                    availabilty: 'OutOfStock',
                }
                Restaurant.update(payload, { where:{id: item_id}})
            }
            if(item_quantity > initial_quantity){
                throw new Error('Stock Quantity is less than the requested quantity or maybe OutOfStock')
            }
    
            const final_quantity = initial_quantity - item_quantity
    
    
            const payload = {
                item_quantity: final_quantity,
            }
    
            const sales_payload = {
                item_id: purchaseitem.id,
                item_name: purchaseitem.item_name,
                item_quantity: item_quantity,
                item_price: purchaseitem.item_price,
                net_amount: net_amount
            }
    
            purchaseitem.status = "Purchased"
            Restaurant.update(payload, { where:{id: item_id}})
            RestaurantSale.create(sales_payload)
        }
    }

    const getPurchasedItems = async (req, res) => {
        const purchasedItems = await RestaurantRepository.findAllPurchasedItems()
        if(!purchasedItems){
            throw new Error("No Purchased Items")
        }

        return purchasedItems
    }

    const getPurchasedItem = async (id) => {
        const purchasedItem = await RestaurantRepository.findStockSaleByID(id)

        if(!purchasedItem){
            throw new Error("Item not found")
        }

        return purchasedItem
    }

    const deletePurchasedItem = async (id) => {
        const purchasedItem = await RestaurantRepository.deleteStockSaleByID(id)

        if(!purchasedItem) {
            throw new Error("Item not found")
        }
        return purchasedItem
    }

    //stock 
    //add stock
    const addStockItem = async (Data) => {
        await Restaurant.create(Data);
    }

    //get stock items
    const getStockItems = async() => {
        const getstockitems = await RestaurantRepository.findAllStockItems();
        
        if(getstockitems.length < 1){
            throw new Error("No Stock Items")
        }
        for (const stockItem of getstockitems) {
            // Check if item_quantity is less than 1
            if (stockItem.dataValues.item_quantity < 1) {
              // Change availability to 'OutOfStock'
              stockItem.dataValues.availabilty = 'OutOfStock';
            }
          }

        return getstockitems
    }

    //get stock
    const getStockItem = async(id) => {
        const getstockitem = await RestaurantRepository.findStockItemByID(id);

        if(!getstockitem){
            throw new Error("Stock Item not found")
        }
        return getstockitem
    }

    //delete stock items
    const deleteStockItem = async(id) => {
        const stockitem = await RestaurantRepository.deleteStockItem(id)

        if(!stockitem){
            throw new Error("Stock Item not found")
        }

        return stockitem
    }

    //update stock items

    return {
        PurchaseItem,
        getPurchasedItems,
        getPurchasedItem,
        deletePurchasedItem,
        addStockItem,
        getStockItems,
        getStockItem,
        deleteStockItem
    }
}

module.exports = ResaurantService;
const db = require('../models');
const Bar = db.BarStockItem;
const BarSale = db.BarItemSale;
const BarRepository = require('../repositories/BarRepository');

const BarService = () => {
    const PurchaseItem = async (id, Data) => {
        const  purchaseitem = await BarRepository.findRetailStockItemByID(id);
        if(!purchaseitem){
            throw new Error('Stock Not Found')
        }
        const initial_quantity = purchaseitem?.item_quantity
        const {item_quantity, net_amount} = Data
        console.log(item_quantity)
        if(initial_quantity == 0){
            const payload = {
                availabilty: 'OutOfStock',
            }
            Bar.update(payload, { where:{id: id}})
        }
        if(item_quantity > initial_quantity){
            throw new Error('Stock Quantity is less than the requested quantity or maybe OutOfStock')
        }
        const final_quantity = initial_quantity - item_quantity
        
        // if(1 < 2){
        //     return Error('blah')
        // }

        
        // if(final_quantity <= 0 ){
        //     // const final_status = "OutOfStock"
        //     const status_payload = {
        //         status: "OutOfStock"
        //     }
        //     Bar.update(status_payload, {where:{id: id}})
        // }
        
        // const itemstatus = purchaseitem.status
        // if(itemstatus == 'OutOfStock'){
        //     throw new Error('Not Found - Out of stock')
        // }
        
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
        console.log(sales_payload)

        Bar.update(payload, { where:{id: id}})
        BarSale.create(sales_payload)
    }

    const getPurchasedItems = async (req, res) => {
        const purchaseditems = await BarRepository.findAllPurchasedItems()
        if(!purchaseditems){
            throw new Error("No Purchased Items")
        }

        return purchaseditems
    }

    const getPurchasedItem = async (id) => {
        const purchasedItem = await BarRepository.findBarItemSaleByID(id)

        if(!purchasedItem){
            throw new Error("Item not found")
        }

        return purchasedItem
    }

    const deletePurchasedItem = async (id) => {
        const purchasedItem = await BarRepository.deleteBarItemSale(id)

        if(!purchasedItem) {
            throw new Error("Item not found")
        }
        return purchasedItem
    }

    //stock 
    //add stock
    const addStockItem = async (Data) => {
        await Bar.create(Data);
    }

    //get stock items
    const getStockItems = async() => {
        const getstockitems = await BarRepository.findAllStockItems();
        
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
        const getstockitem = await BarRepository.findStockItemByID(id);

        if(!getstockitem){
            throw new Error("Stock Item not found")
        }
        return getstockitem
    }

    //delete stock items
    const deleteStockItem = async(id) => {
        const stockitem = await BarRepository.deleteStockItem(id)

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

module.exports = BarService;
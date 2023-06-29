// import db config, model, repository
const db = require("../models");
const Restaurant = db.RestaurantStockItem;
const ResaurantRepository = require("../repositories/RestaurantRepository");

// service function
const ResaurantService = () => {
    const PurchaseItem = async (id, Data) => {
        const purchaseitem = await ResaurantRepository.findRetailStockItemByID(id);

        if(!purchaseitem){
            throw new Error('Not Found')
        }

        purchaseitem.status = "Purchased"
        console.log(purchaseitem)
        Restaurant.create(Data)
    }

    const getPurchasedItems = async () => {
        const purchasedItems = await ResaurantRepository.findAllBarItemSales()

        if(purchasedItems.length < 1){
            throw new Error("No Purchased Items")
        }

        return purchasedItems
    }

    const getPurchasedItem = async (id) => {
        const purchasedItem = await ResaurantRepository.findBarItemSaleByID(id)

        if(!purchasedItem){
            throw new Error("Item not found")
        }

        return purchasedItem
    }

    const deletePurchasedItem = async (id) => {
        const purchasedItem = await ResaurantRepository.deleteBarItemSale(id)

        if(!purchasedItem) {
            throw new Error("Item not found")
        }
        return purchasedItem
    }

    //stock 
    //add stock
    const addStockItem = async (Data) => {
        await ItemStock.create(Data);
    }

    //get stock items
    const getStockItems = async() => {
        const getstockitems = await ResaurantRepository.findAllStockItems();
        
        if(getstockitems.length < 1){
            throw new Error("No Stock Items")
        }

        return getstockitems
    }

    //get stock
    const getStockItem = async(id) => {
        const getstockitem = await ResaurantRepository.findStockItemByID(id);

        if(!getstockitem){
            throw new Error("Stock Item not found")
        }
        return getstockitem
    }

    //delete stock items
    const deleteStockItem = async(id) => {
        const stockitem = await ResaurantRepository.deleteStockItem(id)

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
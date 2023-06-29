const db = require("../models");
const RestaurantStockItem = db.RestaurantStockItem;

//function containing crud operations
const ResaurantRepository = () => {
    //sold stock items
    const findStockSales = async() => {
        return RestaurantStockItem.findAll({ where: {status: "Purchased"}})
    }

    // stock item with the status Retail
    const findRetailStockItemByID = async(id) => {
        return RestaurantStockItem.findOne({ where:{
            id: id,
            status: "Retail"
        }})
    }

    //single sold stock item
    const findStockSaleByID = async (id) => {
        return RestaurantStockItem.findOne({ where: {
            id: id,
            status:"Purchased"
        }})
    }


    //delete sold stock ite,
    const deleteStockSaleByID = async (id) => {
        return RestaurantStockItem.findOne({ where: {
            id: id,
            status:"Purchased"
        }})
    }

    //find all purchased stock items
    const findAllPurchasedItems = async () => {
        return RestaurantStockItem.findAll({ where: {status: "Purchased"}})
    }

    //find restaurant stock item by ID
    const findStockItemByID = async (id) => {
        return await RestaurantStockItem.findOne({ where: {id: id} })
    }

    //find all stock items
    const findAllStockItems = async() => {
        return RestaurantStockItem.findAll()
    }

    //delete stock items
    const deleteStockItem = async (id) => {
        return RestaurantStockItem.destroy({ where: {id: id} })
    }

    return {
        findStockSales,
        findStockItemByID,
        findAllPurchasedItems,
        findAllStockItems,
        deleteStockItem,
        findStockSaleByID,
        deleteStockSaleByID,
        findRetailStockItemByID
    }
}

module.exports = ResaurantRepository();
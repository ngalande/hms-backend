const db = require("../models");
const RestaurantSale = db.RestaurantSale;
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
        return RestaurantSale.findOne({ where: {
            id: id
        }})
    }


    //delete sold stock ite,
    const deleteStockSaleByID = async (id) => {
        return RestaurantSale.destroy({ where: {
            id: id
        }})
    }

    //find all purchased stock items
    const findAllPurchasedItems = async () => {
        return RestaurantSale.findAll()
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
const db = require("../models");
const BarStockItem = db.BarStockItem;

const BarRepository = () => {
    // purchased items
    const findBarItemSaleByID = async (id) => {
        return BarStockItem.findOne({ where: {
            id: id,
            status: "Purchased"
        } 
        })
    } 

    // stock item with the status Retail
    const findRetailStockItemByID = async(id) => {
        return BarStockItem.findOne({ where:{
            id: id,
            status: "Retail"
        }})
    }

    // stock item with the status Retail and update
    const updateRetailStockItemByID = async(id, Data) => {
        return BarStockItem.update(Data, { where:{
            id: id,
            status: "Retail"
        }})
    }

    const findAllPurchasedItems = async () => {
        return BarStockItem.findAll({ where:{status:"Purchased"} })
    }

    const findAllBarItemSales = async () => {
        return BarStockItem.findAll({ where: {status: "Purchased"} })
    }

    const deleteBarItemSale = async (id) => {
        return BarStockItem.destroy({ where: {
            id: id,
            status: "Purchased"
        }})
    }

    //stock
    //find stock item by id
    const findStockItemByID = async (id) => {
        return BarStockItem.findOne({ where: {id: id} })
    }

    //find stock items
    const findAllStockItems = async () => {
        return BarStockItem.findAll()
    }

    //delete stock items
    const deleteStockItem = async (id) => {
        return BarStockItem.destroy({ where: {id: id} })
    }

    return {
        findBarItemSaleByID,
        findAllBarItemSales,
        deleteBarItemSale,
        findStockItemByID,
        findAllStockItems,
        deleteStockItem,
        findAllPurchasedItems,
        findRetailStockItemByID,
        updateRetailStockItemByID
    }
}

module.exports = BarRepository();
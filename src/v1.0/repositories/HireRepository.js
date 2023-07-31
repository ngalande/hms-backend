const db = require("../models");
const Hire = db.Hire;
const HireStock = db.HireStock;

//crud operations

const HireRepository = () => {
    // stock part
    const findAllDehiredStock = async() => {
        return HireStock.findAll()
    }

    const findDeHiredStockByID = async(id) => {
        return HireStock.findOne()
    }

    const findStockItemByID = async(id) => {
        return HireStock.findOne({ 
            where: {
                id:id
            }
        })
    }

    const findAllStockItems = async(id) => {
        return HireStock.findAll()
    }

    
    const findAllPendingStock = async() => {
        return HireStock.findAll()
    }


    
    const findPendingStockByID = async(id) => {
        return HireStock.findOne()
    }

    const deleteStockItem = async (id) => {
        return HireStock.destroy({ 
            where: {
                id: id
            } 
        })
    }
    
    
    // hired ends
    const findAllHired = async() => {
        return Hire.findAll()
    }

    const findAllHiredStockItems = async() => {
        return Hire.findAll()
    }

    const findAllHiredStock = async() => {
        return Hire.findAll()
    }

    const findHiredByID = async(id) => {
        return Hire.findOne({
            where: {
                id:id
            }
        })
    }
    

    const findHiredStockByID = async(id) => {
        return Hire.findOne({
            where:{
                item_id: id
            }
        })
    }
    
    const deleteHiredStockByID = async(id) => {
        return Hire.destroy({
            where: {
                id:id
            }
        })
    }

    return {
        findAllDehiredStock,
        findDeHiredStockByID,
        findStockItemByID,
        findAllStockItems,
        findAllPendingStock,
        findPendingStockByID,
        deleteStockItem,
        findAllHired,
        findAllHiredStock,
        findHiredByID,
        findHiredStockByID,
        findAllHiredStockItems,
        deleteHiredStockByID
    }
}

module.exports = HireRepository()


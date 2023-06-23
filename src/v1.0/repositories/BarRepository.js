const db = require("../models");
const Bar = db.BarItemSale

const BarRepository = () => {
    const findBarItemSaleByID = async (id) => {
        return Bar.findOne({ where: {id: id} })
    }

    const findAllBarItemSales = async () => {
        return Bar.findAll()
    }

    const deleteBarItemSale = async (id) => {
        return Bar.Destroy({ where: {id: id} })
    }

    return {
        findBarItemSaleByID,
        findAllBarItemSales,
        deleteBarItemSale
    }
}

module.exports = BarRepository();
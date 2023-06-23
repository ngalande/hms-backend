const db = require('../models');
const Bar = db.BarItemSale;
const BarRepository = require('../repositories/BarRepository');

const BarService = () => {
    const PurchaseItem = async (Data) => {
        await Bar.create(Data)
    }

    const getPurchasedItems = async () => {
        const purchasedItems = await BarRepository.findAllBarItemSales()

        if(purchasedItems.length<1){
            throw new Error("No Purchased Items")
        }

        return purchasedItems
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

    return {
        PurchaseItem,
        getPurchasedItems,
        getPurchasedItem,
        deletePurchasedItem
    }
}

module.exports = BarService;
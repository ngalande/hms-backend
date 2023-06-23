const BarController = (serviceContainer) => {
    const purchaseItem = async(req, res) => {
        try {
            let purchaseditem = serviceContainer.barservice.PurchaseItem(req.body)
            return res.status(201).json({
                success: true,
                message: `Item successfully purchased!`,
                data: purchaseditem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getPurchasedItems = async(req, res) => {
        try {
            const purchaseditems = serviceContainer.barservice.getPurchasedItems();
            if(purchaseditems < 1) {
                throw new Error("No purchased items")
            }
            return res.status(200).send(purchaseditems)

        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getPurchasedItem = async(req, res) => {
        let id = req.params.id;
        try {
            const purchasedItemid = await serviceContainer.barservice.getPurchasedItem(id);
            if(!purchasedItemid){
                throw new Error("Item not found")
            }
            return res.status(200).send(purchasedItemid)

        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deletePurchasedItem = async(req, res) => {
        let id = req.params.id;
        try {
            await serviceContainer.barservice.deletePurchasedItem(id)
            return res.status(200).send({
                success: true,
                message: `Purchased Item deleted!`
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Purchased  Item doesn't exist`
            })
        }
    }

    return {
        purchaseItem,
        getPurchasedItem,
        getPurchasedItems,
        deletePurchasedItem
    }
}

module.exports = BarController;
const RestaurantController = (serviceContainer) => {
    const purchaseItem = async(req, res) => {
        let id = req.params.id;
        try {
            let purchaseditem = serviceContainer.resaurantservice.PurchaseItem(id, req.body)
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
            const purchaseditems = serviceContainer.resaurantservice.getPurchasedItems();
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
            const purchasedItemid = await serviceContainer.resaurantservice.getPurchasedItem(id);
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
            await serviceContainer.resaurantservice.deletePurchasedItem(id)
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

    //stock
    //add stock
    const createStockItem = async(req, res) => {
        try {
            const newstockitem = await serviceContainer.resaurantservice.addStockItem(req.body)
            return res.status(201).json({
                success: true,
                message: `Stock successfully Created`,
                data: newstockitem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    //list all stock entries
    const getAllStockItems = async(req, res) => {
        try {
            const getstockitems = await serviceContainer.resaurantservice.getStockItems();
            if(getstockitems.length < 1){
                throw new Error("No stock items")
            }
            return res.status(200).send(getstockitems)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    //list single stock entry
    const getStockItemByID = async(req, res) => {
        let id = req.params.id;
        try {
            const getstockitem = await serviceContainer.resaurantservice.getStockItem(id);
            return res.status(200).send(getstockitem);
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    //update stock entry

    //delete entry
    const deleteStockItem = async(req, res) => {
        let id = req.params.id;
        try {
           await serviceContainer.resaurantservice.deleteStockItem(id);
           return res.status(200).send({
            success: true,
            message: `Stock Item deleted!`
        })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Room doesn't exist`
            })
        }
    }


    return {
        purchaseItem,
        getPurchasedItem,
        getPurchasedItems,
        deletePurchasedItem,
        createStockItem,
        getAllStockItems,
        getStockItemByID,
        deleteStockItem
    }
}

module.exports = RestaurantController;
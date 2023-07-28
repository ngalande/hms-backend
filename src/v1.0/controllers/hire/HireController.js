const  HireController = (serviceContainer) => {
    const HireItem = async(req, res) => {
        let id = req.params.id;
        try {
            const hireitem = await serviceContainer.hireservice.HireItem(id, req.body);
            return res.status(201).json({
                success: true,
                message: `Item Successfully Hired!`,
                data: hireitem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const updateHiredItem = async(req, res) => {
        let id = req.params.id
        try {
            const updatehireditem = serviceContainer.hireservice.updateHiredItem(id, req.body);
            return res.status(201).json({
                success: true,
                message: `Item Hire successfully Updated`,
                data: updatehireditem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getAllHired = async(req, res) => {
        try {
            const allhiredItems = await serviceContainer.hireservice.getAllItemsHired();
            if(allhiredItems.lenght < 1){
                throw new Error("No Stock Hired!")
            }
            return res.status(200).send(allhiredItems)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }


    const getHiredItems = async(req, res) => {
        try {
            const hiredItems = await serviceContainer.hireservice.getHiredItems();
            if(hiredItems.length < 1){
                throw new Error("No Hired Items!")
            }
            return res.status(200).send(hiredItems)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getHiredItem = async(req, res) => {
        let id = req.params.id
        try {
            const hireditem = await serviceContainer.hireservice.getHiredItem(id);
            if(!hireditem){
                throw new Error("Hired Item not found!")
            }
            
            return res.status(200).send(hireditem)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteHiredItem = async(req, res) => {
        let id = req.params.id;
        try {
            await serviceContainer.hireservice.deleteHiredItem(id);
            return res.status(200).send({
                success: true,
                message: `Hired Item deleted!`
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Purchased  Item doesn't exist`
            })
        }
    }

    // Stock part
    const createStockItemForHire = async(req, res) => {
        try {
            const newstockitem = await serviceContainer.hireservice.addDehiredStockItem(req.body);
            return res.status(201).json({
                success: true,
                message: `Stock for Hire successfully Created`,
                data: newstockitem
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getalldehiredstockitems = async(req, res) => {
        try {
            const getstockitems = await serviceContainer.hireservice.getDehiredStockItems();
            if(getstockitems.length < 1){
                throw new Error("No stock items to hire")
            }

            return res.status(200).send(getstockitems)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getStockItemToHire = async(req, res) => {
        let id = req.params.id
        try {
            const getStockItem = await serviceContainer.hireservice.getStockItemToHire(id);
            return res.status(200).send(getStockItem)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteStockItemToHire = async(req, res) => {
        let id = req.params.id;
        try {
           await serviceContainer.hireservice.deleteStockItemToHire(id);
           return res.status(200).send({
            success: true,
            message: `Stock Item deleted!`
        })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Stock Item doesn't exist`
            })
        }
    }

    return {
        HireItem,
        getHiredItems,
        updateHiredItem,
        getHiredItem,
        deleteHiredItem,
        createStockItemForHire,
        getalldehiredstockitems,
        getStockItemToHire,
        getAllHired,
        deleteStockItemToHire
    }
}

module.exports = HireController;
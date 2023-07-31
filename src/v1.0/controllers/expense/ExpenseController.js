const ExpenseController = (serviceContainer) => {
    const CreateExpense = async (req, res) => {
        const id = req.params.id
        try {
            const createexpense = await serviceContainer.expenseservice.CreateExpense(id, req.body);
            return res.status(201).json({
                success: true,
                message: `Expense successfully Created`,
                data: createexpense
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getAllExpenditure = async(req, res) => {
        try {
            const getallexpenditure = await serviceContainer.expenseservice.getAllExpenditure();
            if(getallexpenditure.length < 1){
                throw new Error("No expenses recorded")
            }

            return res.status(200).send(getallexpenditure)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getSingleExpenditure = async(req, res) => {
        let id = req.params.id
        try {
            const getsingleexpenditure = await serviceContainer.expenseservice.getSingleExpenditure(id);
            return res.status(200).send(getsingleexpenditure)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteExpenditure = async(req, res) => {
        let id = req.params.id;
        try {
           await serviceContainer.expenseservice.deleteExpenditure(id);
           return res.status(200).send({
            success: true,
            message: `Expense deleted!`
        })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Expense doesn't exist`
            })
        }
    }

    // add stock
    const  createStockItem = async(req, res) => {
        try {
            const newstockitem = await serviceContainer.expenseservice.addExpenditure(req.body)
            return res.status(201).json({
                success: true,
                message: `Expense Stock successfully Created`,
                data: newstockitem
            })
        } catch (error) {
            
        }
    }

    //list all stock entries
    const getAllStockItems = async(req, res) => {
        try {
            const getstockitems = await serviceContainer.expenseservice.getAllStockExpenditure();
            if(getstockitems.length < 1){
                throw new Error("No Expense stock items")
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
            const getstockitem = await serviceContainer.expenseservice.getStockExpenditure(id);
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
           await serviceContainer.expenseservice.deleteStockExpenditure(id);
           return res.status(200).send({
            success: true,
            message: `Expense Stock Item deleted!`
        })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Expense Stock doesn't exist`
            })
        }
    }

    return {
        CreateExpense,
        getAllExpenditure,
        getSingleExpenditure,
        deleteExpenditure,
        createStockItem,
        getAllStockItems,
        getStockItemByID,
        deleteStockItem
    }
}

module.exports = ExpenseController;
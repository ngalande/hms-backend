const ExpenseController = (serviceContainer) => {
    const CreateExpense = async (req, res) => {
        try {
            const createexpense = await serviceContainer.expenseservice.CreateExpense(req.body);
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

    return {
        CreateExpense,
        getAllExpenditure,
        getSingleExpenditure,
        deleteExpenditure
    }
}

module.exports = ExpenseController;
const db = require("../models");
const Hire = db.Hire;
const HireStock = db.HireStock;
const HireRepository = require("../repositories/HireRepository");

const HireService = () => {
    // Hire stock
    const HireItem = async(id, Data) => {
        const hireitem = await HireRepository.findDeHiredStockByID(id);

        if(!hireitem){
            throw new Error("DeHired item not found")
        }

        const initial_quantity = hireitem?.item_quantity
        const { item_quantity, description, net_amount, duration, status, customer_name, customer_email, customer_phone_number } = Data

        if(initial_quantity == 0){
            const payload = {
                availabilty: 'OutOfStock'
            }
            Hire.update(payload, { where: {id: id}})
        }
        
        if(item_quantity > initial_quantity){
            throw new Error('Stock Quantity is less than the requested quantity or maybe OutOfStock')
        }

        const final_quantity = initial_quantity - item_quantity

        const payload = {
            item_quantity: final_quantity,
            // status: "Hired"
        }

        const hire_payload = {
            item_id: hireitem.id,
            item_name: hireitem.item_name,
            item_quantity: hireitem.item_quantity,
            item_price: hireitem.item_price,
            customer_name: customer_name,
            customer_phone_number: customer_phone_number,
            customer_email: customer_email,
            net_amount: net_amount,
            description: description,
            duration: duration,
            status: "Hired"
        }

        HireStock.update(payload, { where:{id: id}})
        Hire.create(hire_payload)
    }

    const updateHiredItem = async (id, Data) => {
        const hireditem = await HireRepository.findHiredStockByID(id)
        // console.log(hireditem)
        const { status } = Data
        if(!hireditem){
            throw new Error('Hired Item not found')
        } 
            const hire_payload = {
                status: status,
            }

            HireStock.update(hire_payload, { where: { id: id}})
            Hire.update(hire_payload, { where: { item_id: id}})
        
    }

    const getAllItemsHired = async(req, res) => {
        const allhireditems = await HireRepository.findAllHired()
        if(allhireditems.length < 1){
            throw new Error("No Stock Hired")
        }

        return allhireditems
    }

    const getHiredItems = async (req, res) => {
        const hireditems = await HireRepository.findAllHiredStockItems()
        if(hireditems.length < 1){
            throw new Error("No Hired Items!")
        }

        return hireditems
    }

    const getHiredItem = async (id) => {
        const hireditem = await HireRepository.findHiredByID(id)
        if(!hireditem){
            throw new Error("Hired Item not found")
        }

        return hireditem
    }

    const deleteHiredItem = async (id) => {
        const deletehireditem = await HireRepository.deleteHiredStockByID(id)
        if(!deletehireditem) {
            throw new Error("Item not found")
        }
        return deletehireditem
    }

    //Stock
    // add stock
    const addDehiredStockItem = async(Data) => {
        await HireStock.create(Data)
    }

    // get stock items
    const getDehiredStockItems = async() => {
        const getalldehiredstockitems = await HireRepository.findAllStockItems()

        if(getalldehiredstockitems.lenght < 1){
            throw new Error("No Items to Hire")
        }
        
        return getalldehiredstockitems
    }

    // get stock item
    const getStockItemToHire = async(id) => {
        const getstockitem = await HireRepository.findStockItemByID(id);
        if(!getstockitem){
            throw new Error("Stock to Hire not found")
        }

        return getstockitem
    }

    const deleteStockItemToHire = async(id) => {
        const deleteitem = await HireRepository.deleteStockItem(id);
        if(!deleteitem){
            throw new Error("Stock to hire not found")        
        }

        return deleteitem
    }

    return {
        HireItem,
        updateHiredItem,
        getHiredItems,
        getHiredItem,
        deleteHiredItem,
        addDehiredStockItem,
        getDehiredStockItems,
        getStockItemToHire,
        getAllItemsHired,
        deleteStockItemToHire
    }
}

module.exports = HireService;
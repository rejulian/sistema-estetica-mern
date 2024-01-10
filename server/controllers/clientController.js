import { ClientModel } from "../model/clientModel.js";

export const createClient = async (req, res) => {
    try {
        const { name, phone, dni, notes } = req.body;
        if (!name || !phone || !dni) {
            return res.json({ message: 'Complete todos los campos obligatorios' })
        }

        const client = await ClientModel.create({ name, phone, dni, notes })
        return res.json(client)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, dni, notes } = req.body;

        if (!name || !phone || !dni) {
            return res.status(400).json({ message: 'Complete todos los campos obligatorios' })
        }

        const client = await ClientModel.findByIdAndUpdate(id, { name, phone, dni, notes })

        if (!client) {
            return res.status(404).json({ message: 'No se encontro un cliente' })
        }
        return res.json(client)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await ClientModel.findByIdAndDelete(id)
        if (!client) {
            return res.status(404).json({ message: 'No se encontro un cliente' })
        }
        res.json({ message: 'Cliente eliminado' })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.find({})
        if (!clients) {
            return res.status(404).json({ message: 'No se encontraron clientes' })
        }
        return res.json(clients)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await ClientModel.findById(id);
        if (!client) {
            return res.status(404).json({message:'No se encontro el cliente'})
        }
        return res.json(client)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
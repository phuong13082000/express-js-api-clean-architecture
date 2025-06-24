const addressController = (addressUseCase, userUseCase) => ({
    get: async (req, res) => {
        try {
            const userId = req.userId;
            const data = await addressUseCase.getByUserId(userId);

            return res.status(201).json({
                status: "success",
                data: data,
                message: "List of address",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    create: async (req, res) => {
        try {
            const userId = req.userId;
            const {address_line, city, state, pinCode, country, mobile} = req.body;

            const saveAddress = await addressUseCase.create({
                userId: userId,
                address_line,
                city,
                state,
                pinCode,
                country,
                mobile,
            })

            await userUseCase.findIdAndUpdate(userId, {
                $push: {address_details: saveAddress._id}
            })

            return res.status(201).json({
                status: "success",
                message: "Address added successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.userId;
            const {_id, address_line, city, state, pinCode, country, mobile} = req.body;

            await addressUseCase.update({_id: _id, userId: userId}, {
                address_line,
                city,
                state,
                pinCode,
                country,
                mobile,
            })

            return res.status(201).json({
                status: "success",
                message: "Address updated successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.userId;
            const {_id} = req.body;

            await addressUseCase.update({_id: _id, userId: userId}, {status: false});

            return res.status(201).json({
                status: "success",
                message: "Address deleted successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    }
})

export default addressController;

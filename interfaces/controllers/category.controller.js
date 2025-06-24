const categoryController = (categoryUseCase) => ({
    get: async (req, res) => {
        try {
            const data = categoryUseCase.getAll();

            return res.status(201).json({
                status: "success",
                data: data,
                message: "List of category",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    create: async (req, res) => {
        try {
            const {title, image} = req.body

            if (!title || !image) {
                return res.status(400).json({status: "success", message: "Enter required fields"})
            }

            await categoryUseCase.create({title, image})

            return res.status(201).json({
                status: "success",
                message: "Category added successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    update: async (req, res) => {
        try {
            const {_id, title, image} = req.body

            await categoryUseCase.update({_id: _id}, {title, image})

            return res.status(201).json({
                status: "success",
                message: "Category updated successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    delete: async (req, res) => {
        try {
            const {_id} = req.body

            // const checkSubCategory = await SubCategoryModel.find({
            //     category: {
            //         "$in": [_id]
            //     }
            // }).countDocuments()
            //
            // const checkProduct = await ProductModel.find({
            //     category: {
            //         "$in": [_id]
            //     }
            // }).countDocuments()
            //
            // if (checkSubCategory > 0 || checkProduct > 0) {
            //     return response.status(400).json({
            //         success: false,
            //         message: "Category is already use can't delete",
            //     })
            // }

            await categoryUseCase.delete({_id: _id})

            return res.status(201).json({
                status: "success",
                message: "Category deleted successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    }
})

export default categoryController;

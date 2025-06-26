const categoryController = (categoryUseCase, subCategoryUseCase) => ({
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
            const {title, slug, image} = req.body

            if (!title || !image) {
                return res.status(400).json({status: "error", message: "Enter required fields"})
            }

            await categoryUseCase.create({title, slug, image})

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
            const {_id, title, slug, image} = req.body

            await categoryUseCase.update({_id: _id}, {title, slug, image})

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

            const checkSubCategory = await subCategoryUseCase.countSubCategoriesByCategoryId(_id);

            // const checkProduct = await ProductModel.find({
            //     category: {
            //         "$in": [_id]
            //     }
            // }).countDocuments()

            // if (checkSubCategory > 0 || checkProduct > 0) {
            if (checkSubCategory > 0) {
                return res.status(400).json({status: "error", message: "Category is already use can't delete"})
            }

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

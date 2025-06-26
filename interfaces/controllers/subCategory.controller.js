const subCategoryController = (subCategoryUseCase) => ({
    get: async (req, res) => {
        try {
            const data = subCategoryUseCase.getAll();

            return res.status(201).json({
                status: "success",
                data: data,
                message: "List of sub category",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    create: async (req, res) => {
        try {
            const {title, slug, image, category} = req.body

            if (!title || !image || !category[0]) {
                return res.status(400).json({status: "error", message: "Enter required fields"})
            }

            await subCategoryUseCase.create({title, slug, image, category})

            return res.status(201).json({
                status: "success",
                message: "Sub category added successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    update: async (req, res) => {
        try {
            const {_id, title, slug, image, category} = req.body

            const checkSubCategory = await subCategoryUseCase.findId(_id)

            if (!checkSubCategory) {
                return res.status(400).json({status: "error", message: "Sub category not found"})
            }

            await subCategoryUseCase.findIdAndUpdate(_id, {title, slug, image, category})

            return res.status(201).json({
                status: "success",
                message: "Sub category updated successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },
    delete: async (req, res) => {
        try {
            const {_id} = req.body

            await subCategoryUseCase.findIdAndDelete(_id)

            return res.status(201).json({
                status: "success",
                message: "Sub category deleted successfully",
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    }
})

export default subCategoryController;

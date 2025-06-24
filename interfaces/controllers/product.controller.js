import Product from "../../domain/models/Product.js";

const productController = (productUseCase) => ({
    list: async (req, res) => {
        try {
            let {page, limit, search} = req.body;

            if (parseInt(page) > 0) {
                page = parseInt(page);
            } else {
                page = 1;
            }

            if (parseInt(limit) > 0 && limit <= 20) {
                limit = parseInt(limit);
            } else {
                limit = 10;
            }

            const query = search ? {$text: {$search: search}} : {};

            const skip = (page - 1) * limit;

            const products = await productUseCase.list(query, skip, limit);

            const totalCount = await productUseCase.count(query);

            return res.json({
                status: 'success',
                data: products,
                totalCount: totalCount,
                totalNoPage: Math.ceil(totalCount / limit),
                message: ''
            });
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },

    create: async (req, res) => {
        try {
            const {
                title,
                slug,
                image,
                category,
                subCategory,
                unit,
                stock,
                price,
                discount,
                description,
                more_details,
            } = req.body

            if (
                !title ||
                !Array.isArray(image) || image.length === 0 ||
                !Array.isArray(category) || category.length === 0 ||
                !Array.isArray(subCategory) || subCategory.length === 0 ||
                !unit || !price || !description
            ) {
                return res.status(400).json({
                    status: "error",
                    message: "Missing required fields",
                });
            }

            const product = new Product(
                title,
                slug,
                image,
                category,
                subCategory,
                unit,
                stock,
                price,
                discount,
                description,
                more_details,
            )

            const saveProduct = await productUseCase.create(product);

            return res.json({
                status: 'success',
                data: saveProduct,
                message: 'Product created successfully',
            })
        } catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    },

    getById: async (req, res) => {
        try {
            const {productId} = req.body

            if (!productId) {
                return res.status(400).json({
                    status: "error",
                    message: "Missing productId",
                });
            }

            const product = await productUseCase.getById(productId);

            return res.json({
                status: 'success',
                data: product,
                message: '',
            })
        }catch (e) {
            return res.status(500).json({status: "error", message: e.message});
        }
    }
});

export default productController;

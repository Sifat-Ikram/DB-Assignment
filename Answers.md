# DB-Assignment
1. Explain the relationship between the "Product" and "Product_Category" entities from the above diagram.
   Answer: It is common that products are belong to one or more categories where one product can belong to only one category, but a category can have multiple products. Generally, categories contain a key that establishes the association between a product and its corresponding category. In the above diagram the value of "category_id" is the key through which we can identify a specific product or multiple products which are belong to that specfic category from the array of products.

2. How could you ensure that each product in the "Product" table has a valid category assigned to it?
   Answer: To ensure that each product in the "Product" table has a valid category assigned, we can follow these steps:
   1. First we set up two separate collections for products and categories.
   2. Then we have to implement strict validation rules to ensure that each product document includes a valid category ID. We have to verify the existence of the category ID before inserting or updating a product.
   3. We have to maintain relationships between products and categories within the database. We enforce constraints to restrict the insertion or updating of products to only include existing category IDs.

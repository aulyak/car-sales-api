const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'kuya',
  host: 'localhost',
  database: 'djubli',
  password: 'admin',
  port: 5433,
});

const getCarSaleInfoById = (request, response) => {
  const carSaleId = parseInt(request.params.id);

  const query = `SELECT A.CAR_SALE_ID,
    F.MANUFACTURER_NAME,
    E.MODEL_NAME,
    A.MODEL_YEAR,
    CASH_PRICE,
    CREDIT_PRICE,
    CREDIT_TYPE,
    C.TENURE,
    C.DOWN_PAYMENT,
    C.INSTALLMENT,
    D.*
  FROM PUBLIC.CAR_FOR_SALE AS A
  JOIN PUBLIC.SELLER AS B ON A.SELLER_ID = B.SELLER_ID
  JOIN PUBLIC.CREDIT_SCHEME AS C ON A.CAR_SALE_ID = C.CAR_SALE_ID
  LEFT JOIN PUBLIC.FIX_N_CAP AS D ON C.CREDIT_ID = D.CREDIT_ID
  JOIN PUBLIC.CAR_MODEL AS E ON A.MODEL_CODE = E.MODEL_CODE
  JOIN PUBLIC.CAR_MANUFACTURER AS F ON E.MANUFACTURER_CODE = F.MANUFACTURER_CODE
  WHERE A.CAR_SALE_ID = $1;`;
  // const query = 'SELECT * FROM CAR_MODEL;';

  pool.query(query, [carSaleId], (error, results) => {
    if (error) {
      throw error;
    }
    console.log({res: results.rows});

    response.status(200).json(results.rows);
  });
};

const getAllCarSaleInfo = (request, response) => {
  const carSaleId = parseInt(request.params.id);

  const query = `SELECT A.CAR_SALE_ID,
    F.MANUFACTURER_NAME,
    E.MODEL_NAME,
    A.MODEL_YEAR,
    CASH_PRICE,
    CREDIT_PRICE,
    CREDIT_TYPE,
    C.TENURE,
    C.DOWN_PAYMENT,
    C.INSTALLMENT,
    D.*
  FROM PUBLIC.CAR_FOR_SALE AS A
  JOIN PUBLIC.SELLER AS B ON A.SELLER_ID = B.SELLER_ID
  JOIN PUBLIC.CREDIT_SCHEME AS C ON A.CAR_SALE_ID = C.CAR_SALE_ID
  LEFT JOIN PUBLIC.FIX_N_CAP AS D ON C.CREDIT_ID = D.CREDIT_ID
  JOIN PUBLIC.CAR_MODEL AS E ON A.MODEL_CODE = E.MODEL_CODE
  JOIN PUBLIC.CAR_MANUFACTURER AS F ON E.MANUFACTURER_CODE = F.MANUFACTURER_CODE;`;
  // const query = 'SELECT * FROM CAR_MODEL;';

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

const updateCarSaleById = (request, response) => {
  const id = parseInt(request.params.id);
  const {model_year, title, description, cash_price, credit_type, credit_price} = request.body;

  query = `UPDATE PUBLIC.CAR_FOR_SALE
    SET MODEL_YEAR = $1,
    TITLE = $2,
    DESCRIPTION = $3,
    CASH_PRICE = $4,
    CREDIT_TYPE = $5,
    CREDIT_PRICE = $6
  WHERE CAR_SALE_ID = $7;`;

  pool.query(
    query,
    [
      model_year,
      title,
      description,
      cash_price,
      credit_type,
      credit_price,
      id
    ],
    (error, results) => {
      console.log({error});
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getCarSaleInfoById,
  getAllCarSaleInfo,
  updateCarSaleById,
};
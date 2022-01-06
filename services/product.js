import callAPI from '@/config/api';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const formData = true;

export async function getProductAPI() {
  const path = `/api/products`;

  return callAPI({
    path,
    method: 'GET',
  });
}

export async function getProductByIdAPI(id) {
  const path = `/api/products/${id}/id`;

  return callAPI({
    path,
    method: 'GET',
  });
}

export async function insertProductAPI(productData) {
  const path = `/api/products`;

  return callAPI({
    path,
    method: 'POST',
    data: productData,
    token,
    formData,
  });
}

export async function updateProductAPI(productData, id) {
  const path = `/api/products/${id}`;

  return callAPI({
    path,
    method: 'PUT',
    data: productData,
    token,
  });
}

export async function deleteProductAPI(id) {
  const path = `/api/products/${id}`;

  return callAPI({
    path,
    method: 'DELETE',
    token,
  });
}

export async function createStoreAPI(formData) {
  const path = `/api/store`;

  return callAPI({
    path,
    method: 'POST',
    data: formData,
    token,
    formData,
  });
}

export async function insertProductImageAPI(productData, id) {
  const path = `/api/add-image/${id}`;

  return callAPI({
    path,
    method: 'POST',
    data: productData,
    token,
    formData,
  });
  // const result = await axios.post(`${API_ENDPOINT}/add-image/${id}`, productData, {
  //   headers: {
  //     Authorization: 'Bearer ' + Cookies.get('token'),
  //     Accept: 'multipart/form-data',
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });
  // const axiosResult = result;
  // return axiosResult;
}

// TODO 1-add-todo-controller
type TDeviceControllerGetAllRequest = {
  brandId?: number;
  typeId?: number;
  limit?: number;
  page?: number;
};

// TODO: remove
type TDeviceControllerQueryParams = {
  brandId?: number;
  typeId?: number;
};

export {
  TDeviceControllerGetAllRequest,
  TDeviceControllerQueryParams,
};

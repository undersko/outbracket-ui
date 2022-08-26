const appendFormData = (formData: FormData, data: any, key: string) => {
  if (!data) {
    return;
  }
  if (data instanceof File || data instanceof Blob) {
    formData.append(key, data);
  } else if (data instanceof Date) {
    formData.append(key, data.toISOString());
  } else if (typeof data === 'object') {
    for (const dataKey in data) {
      appendFormData(formData, data[dataKey], `${key}.${dataKey}`);
    }
  } else if (Array.isArray(data)) {
    for (const elem of data) {
      appendFormData(formData, elem, `${key}[]`);
    }
  } else {
    formData.append(key, data);
  }
};

export const getAxiosRequestData = (data: any, headers: {'Content-Type'?: string}) => {
  if (!((headers?.['Content-Type'] as string) || '').includes('form-data')) {
    return data;
  }

  const bodyFormData = new FormData();
  for (const dataKey in data) {
    appendFormData(bodyFormData, data[dataKey], dataKey);
  }
  return bodyFormData;
};

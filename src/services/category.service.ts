import { dataFake } from '~/pages/category/data';

const categoryServices = {
  list: async () => {
    // Giả lập delay 0.5 giây
    await new Promise((r) => setTimeout(r, 500));

    return {
      success: true,
      message: 'Successful',
      data: dataFake,
    };
  },
};

export default categoryServices;

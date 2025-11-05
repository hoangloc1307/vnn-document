const authServices = {
  login: async (payload: { username: string; password: string }) => {
    // Giả lập delay 0.5 giây
    await new Promise((r) => setTimeout(r, 500));

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          username: payload.username,
          name: 'Trần Hoàng Lộc',
          email: 'loc.tran@vnn.com.vn',
        },
        tokens: {
          accessToken: 'fake-access-token-xyz',
        },
      },
    };
  },
  // apiMain.post<{
  //   success: boolean;
  //   message: string;
  //   data: {
  //     user: {
  //       username: string;
  //       name: string;
  //       email: string;
  //     };
  //     tokens: {
  //       accessToken: string;
  //     };
  //   };
  // }>('/auth/login', payload),
};

export default authServices;

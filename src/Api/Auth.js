import Connection from './Connection';

export default {
  signIn: async (email, password) => {
    try {
      const req = await fetch(`${Connection}/oauth/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          grant_type: 'password',
          client_id: 2,
          client_secret: 'WiqJuqPMCUzmPTesw67otOhLlqf9M1LPrKnOcqgq',
        }),
      });

      const data = await req.json();

      return data;
    } catch (error) {}
  },
  getIdProject: async token => {
    try {
      const req = await fetch(`${Connection}/api/informacoes_obras/user`, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await req.json();

      return data;
    } catch (error) {}
  },
  changePassword: async (token, currentPassword, newPassword) => {
    try {
      const req = await fetch(
        `${Connection}/api/informacoes_obras/user/alterar_senha`,
        {
          method: 'Post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: newPassword,
          }),
        },
      );

      const data = await req.json();

      return data;
    } catch (error) {
      return error.response;
    }
  },
};


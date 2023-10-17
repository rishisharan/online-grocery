import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return  <AuthForm/>;
}

export default AuthenticationPage;

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signup';

  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: 'Unsupported mode.'}, {status: 422});
  }

  const data = await request.formData();
  const authData = {
    username: data.get('email'),
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/api/auth/'+ mode, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(authData)
  });

  console.log(response);
  if(response.status === 422 || response.status === 401 || response.status === 400) {
    return response;
  }

  if(!response.ok) {
    throw json({message: 'Could not authenticate user'}, {status : 500});
  }

  if (mode === 'login' && response.status === 200) {
    const respData = await response.json();
    console.log('Response ', respData);
    localStorage.setItem('accessToken', respData.accessToken);
    localStorage.setItem('roles', respData.roles);
    localStorage.setItem('username', respData.username);
    localStorage.setItem('email', respData.email);
    localStorage.setItem('id', respData.id);
    const obj = localStorage.getItem('authDetails');
    console.log('Object is ', obj);
    return redirect('/dashboard');
  }

  return response;
}
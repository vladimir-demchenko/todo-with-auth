import { Button, Form, Input } from 'antd';
import AuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const response = await AuthService.login(values.email, values.password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            navigate('/');
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className='flex justify-center py-10'>
             <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Почта"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Не правильная почта',
                    },
                    {
                    required: true,
                    message: 'Пожалуйста введите свою почту!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Пароль"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Пожалуйста введите свой пароль!',
                    },
                ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                    <Button htmlType="submit">
                        Авторизоваться
                    </Button>
                    <Button onClick={navigate('/register')} type='link'>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginPage;
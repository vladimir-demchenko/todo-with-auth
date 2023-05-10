import {
    Button,
    Form,
    Input,
  } from 'antd';
import AuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router';
  
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }; 
  const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
      const response = await AuthService.registration(values.email, values.password);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    };
    
    return (
      <div className='flex justify-center py-10 w-500'>
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              type: 'email',
              message: 'Неправильная почта!',
            },
            {
              required: true,
              message: 'Пожалуйста введите почту!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста подтвердите ваш пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  };

  export default RegisterPage;
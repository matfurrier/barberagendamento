import React, { useState, useContext } from 'react';
import { MdEmail, MdLock, MdLastPage } from 'react-icons/md';
import { Form, FormikProps, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

interface Values {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('E-mail deve ser válido'),
  password: Yup.string()
    .required('Password obrigatório')
    .min(6, 'No mínimo 6 caractéries'),
});

const SignIn: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });

  const { user, signIn } = useAuth();

  async function handleSubmit(values: Values) {
    try {
      const { email, password } = values;
      await signIn({ email, password });
    } catch (err) {
      const error = err.response.data.message;
      toast.error(error);
    }
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="" />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<Values>) => (
            <Form>
              <h3>Faça seu login</h3>

              <Input icon={MdEmail} name="email" placeholder="E-mail" />

              <Input
                icon={MdLock}
                name="password"
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Entrar</Button>
              <button type="button">Esqueci minha senha</button>
            </Form>
          )}
        </Formik>

        <Link to="/register">
          <MdLastPage color="#FF9000" size={16} />
          Criar Conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
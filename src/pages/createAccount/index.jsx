import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header'
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { 
    Container, 
    Title, 
    Column, 
    TitleLogin, 
    SubtitleLogin, 
    ExistingAccountText, 
    ExistingAccountLinkText,
    PolicyAgreement,
    ErrorText,
    Row, 
    Wrapper 
} from './styles';

const schema = yup.object({
    name: yup.string().min(5,'Digite seu nome completo com no mínimo 5 caracteres!').required(),
    email: yup.string().email('O e-mail informado não é válido!').required('Digite seu email!'),
    password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres!').required(('Digite uma senha!')),
}).required()

const CreateAccount = () => {

    const navigate = useNavigate()
    
    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const handleClickLogin = () => {
        navigate('/login')
    }
    
    const onSubmit = async (formData) => {
    try{
            const result = await api.post(`/users?name=${formData.name}&email=${formData.email}&password=${formData.password}`);
            alert('Usuário cadastrado com sucesso!');
            navigate('/login') ;
            return;  
        }catch(e){
            alert('Houve um erro ao cadastrar seu usuário! Favor tentar novamente mais tarde.')
        }
    };
    
    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
                    </Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="name"  errorMessage={errors?.name?.message} control={control} />
                    {errors.name && <span>Nome é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  errorMessage={errors?.email?.message} control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="password" errorMessage={errors?.password?.message} control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <PolicyAgreement>
                    Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                </PolicyAgreement>
                <Row>
                    <ExistingAccountText>Já tenho conta.</ExistingAccountText>
                    <ExistingAccountLinkText onClick={handleClickLogin}>Fazer login</ExistingAccountLinkText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { CreateAccount }
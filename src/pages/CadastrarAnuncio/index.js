import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';
import { api } from '../../config';

export const CadastrarAnuncio = () => {

    const [status, setStatus] = useState({ //mensagem de erro
        formSave: false, //nao está enviando para API
        type: '',
        mensagem: ''
    })

    const [anuncio, setAnuncio] = useState({
        titulo: '',
        descricao: ''
    })

    //receber valores do formulário / ...anuncio indica que está pegando o valor que 'anuncio' no setState já tem
    const valorInput = (e) => setAnuncio({...anuncio, [e.target.name]: e.target.value});

    const cadAnuncio = async (e) => {

        setStatus({ formSave: true }) //indica que está salvando para a API 

        e.preventDefault(); //nao recarregar a página ao clicar
        // console.log(anuncio)
        //recebendo conteudo 
        const headers = {
            'Content-Type': 'application/json' //indicando que os dados serão enviados em JSON
        }
        await axios.post(api+"/cadastrar", anuncio, { headers })
        .then((response) => {
            // console.log(response)
            if(response.data.error) { //vem da api
               setStatus({
                   formSave: false, //se a api nao responder user pode cadastrar de novo
                   type: 'error',
                   mensagem: response.data.message
               })
            } else {
                setStatus({
                    formSave: false, //se a api nao responder user pode cadastrar de novo
                    type: 'success',
                    mensagem: response.data.message
                }) 
            }
        })
        .catch(()=> {
            console.log("Erro")
        })
    }

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="mr-auto p-2">
                        <h1>Cadastrar Anúncio</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/"} className="btn btn-info btn text-right">Listar</Link>
                    </div>
                </div>
                <hr className="mb-4" />

                {/*vefificação se vai exibir mensagem de erro */}
                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ''}  
                {/*vefificação se vai exibir mensagem de sucesso */}  
                {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ''}    

                <Form onSubmit={cadAnuncio}>
                    <FormGroup>
                        <Label>Titulo</Label>
                        <Input type="text" name="titulo" id="titulo" placeholder="Digite o título do anúncio" onChange={valorInput} /> 
                        {/* sempre que houver uma alteração no campo, chame a seguinte função onChange={valorInput} */}
                    </FormGroup>
                    
                    <FormGroup className="mt-4">
                        <Label>Descrição</Label>
                        <Input type="textarea" name="descricao" placeholder="Digite a descrição do anúncio" onChange={valorInput} />
                    </FormGroup>

                    {/* <Button className="mt-4" type="submit" color="success">Cadastrar</Button> */}
                    {status.formSave ? "Salvando" : <Button className="mt-4" type="submit" color="success">Cadastrar</Button> }
                </Form>


            </Container>
        </div>
    );
};
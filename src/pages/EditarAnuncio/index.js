import React, { useState, useEffect } from 'react';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { api } from '../../config';

export const EditarAnuncio = (props) => {
    const history = useHistory()
    const [id] = useState(props.match.params.id); //recebendo id
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const [status, setStatus] = useState({ //mensagem de erro
        formSave: false, //nao está enviando para API
        type: '',
        mensagem: ''
    })

    //metodo put editar
    const editAnuncio = async (e) => {
        setStatus({ formSave: true })
        e.preventDefault();
        const headers = { 'Content-Type': 'application/json' } //indicando que os dados serão enviados em JSON 
        await axios.put(api + "/editar", {id, titulo, descricao}, {headers})
        .then((response) =>{
            // console.log(response.data.error)
            // console.log(response.data.message)
            if (response.data.error) {
                setStatus({
                    formSave: false, //nao está enviando para API
                    type: 'error',
                    mensagem: response.data.message
                 })
            }else {
                setStatus({
                    formSave: false, //nao está enviando para API
                    type: 'success',
                    mensagem: response.data.message
                 })
            }
        })
        .catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Erro: tente mais tarde!'
            })
        })
        history.push("/visualizar-anuncio/"+id)
    }

    //visualizando os dados pela api
    useEffect(() => {
        const getAnuncio = async () => {
            await axios
                .get(api + "/visualizar/" + id)
                .then((response) => {
                    // console.log(response.data.anuncio);
                    setTitulo(response.data.anuncio.titulo); //recuperando titulo na api e mostrando no form
                    setDescricao(response.data.anuncio.descricao); //recuperando descricao na api e mostrando no form
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: tente mais tarde!'
                    })
                });
        };
        getAnuncio();
    }, [id]); //id para nao ficar recarregando

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="mr-auto p-2">
                        <h1>Editar Anúncio</h1>
                    </div>
                    <div className="p-2 text-right">
                        <Link to={"/"} className="btn btn-info btn-sm text-right m-1 text-right">Listar</Link>
                        <Link to={"/visualizar-anuncio/" + id} className="btn btn-outline-primary btn-sm text-right">Visualizar</Link>
                    </div>
                </div>
                <hr className="mb-4" />

                 {/*vefificação se vai exibir mensagem de erro */}
                 {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ''}  
                {/*vefificação se vai exibir mensagem de sucesso */}  
                {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ''} 

                <Form onSubmit={editAnuncio}>
                    <FormGroup>
                        <Label>Titulo</Label>
                        <Input
                             type="text"
                             name="titulo"
                             id="titulo"
                             placeholder="Digite o título do anúncio"
                             required max="120"
                             value={titulo} /* value{titulo } mostra o titulo vindo da api no input do form */
                             onChange={e => setTitulo(e.target.value)} /*pegando alteração e colocando no setTitulo pega o valor quando o user fizer alteração */
                         /> 
                    </FormGroup>

                    <FormGroup className="mt-4">
                        <Label>Descrição</Label>
                        <Input
                            type="textarea" 
                            name="descricao" 
                            placeholder="Digite a descrição do anúncio"
                            value={descricao} /* value{titulo } mostra o titulo vindo da api no input do form*/
                            onChange={e => setDescricao(e.target.value)} /*pegando alteração e colocando no setTitulo pega o valor quando o user fizer alteração */
                        />
                    </FormGroup>
                    {/* <Button className="mt-4" type="submit" color="success">Cadastrar</Button> */}
                    {status.formSave ? <Button disabled className="mt-4" type="submit" outline color="danger">Editando <Spinner size="sm" children="" color="danger" /></Button> : <Button className="mt-4" type="submit" color="danger">Salvar</Button>}
                </Form>
            </Container>
        </div>
    );
};
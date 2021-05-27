import React, { useState, useEffect } from 'react';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { api } from '../../config';

export const EditarAnuncioImg = (props) => {

    const [id] = useState(props.match.params.id); //recebendo id
    const [imagem, setImagem] = useState('') //nova imagem
    const [dataImg, setDataImg] = useState(); //imagem atual
    const [status, setStatus] = useState({ //mensagem de erro
        formSave: false, //nao está enviando para API
        type: '',
        mensagem: ''
    })

    //editando imagem / mandando pro banco
    const editarAnuncioImagem = async (e) => {
        e.preventDefault()
        setStatus({ formSave: true })
        const formData = new FormData();
        const headers = { 'Content-Type': 'application/json' } //indicando que os dados serão enviados em JSON 
        formData.append('imagem', imagem) //coluna 'imagem' recebe o imagem do front (useState) 
        await axios.put(api + "/editar-anuncio-img/" + id, formData, {headers})
        .then((response) => {
            if(response.data.error) {
                setStatus({
                    formSave:false,
                    type: 'error',
                    mensagem: response.data.message
                })
            } else {
                setStatus({
                    formSave:false,
                    type: 'success',
                    mensagem: response.data.message
                })
            }
        }).catch(() =>{
            setStatus({
                formSave: false,
                type: 'success',
                mensagem: "Erro imagem do anuncio não editada com sucesso"
            })
        })
    }

    //visualizando os dados pela api
    useEffect(() => {
        const getAnuncio = async () => {
            await axios
                .get(api + "/visualizar/" + id)
                .then((response) => {
                    setDataImg(response.data.endereco_imagem); //recuperando imagem na api
                   
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
                        <h1>Editar Imagem do Anúncio</h1>
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

                <Form onSubmit={editarAnuncioImagem}>
                    <FormGroup>
                        <Label>Imagem</Label><br /><br />
                        <Input 
                            type="file"
                            name="imagem" 
                            onChange={e => setImagem(e.target.files[0])} 
                        />
                    </FormGroup><br />
                    <FormGroup>
                        {imagem 
                        ? <img src={URL.createObjectURL(imagem)} alt="Imagem anuncio" width="150" heigh="150" /> //se
                        : <img src={dataImg} alt="Imagem anuncio" width="150" heigh="150" /> //senao
                        } 
                    </FormGroup>
                    <br />
                    {status.formSave 
                    ? <Button disabled className="mt-4" type="submit" outline color="danger">Editando <Spinner size="sm" children="" color="danger" /></Button>
                    : <Button className="mt-4" type="submit" color="danger">Salvar</Button>}
                </Form> 
            </Container>
        </div>

    )
};
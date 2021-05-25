import React, { useState, useEffect } from "react";
import { Container, Table, Alert } from "reactstrap";
import axios from "axios";
//importar como objeto
import {api} from "../../config/";
import { Link } from "react-router-dom";

export const Home = () => {
     
    const [data, setData] = useState([]); //variavel que será setado os dados
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const getAnuncios =  async () => { //metodo get da api
        await axios.get(api)
        .then((response) => {
            console.log(response.data.anuncios);
            setData(response.data.anuncios);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Erro: tente novamente mais tarde!'
            })
        })
    }

    useEffect(() => {
        getAnuncios();
    },[])

    //apagando anuncio
    const apagarAnuncio = async (idAnuncio) => {
        console.log(idAnuncio)
        const headers = { 'Content-Type': 'application/json' }
        await axios.delete(api + "/apagar/" + idAnuncio, {headers})
        .then((response) => {
            if (response.data.error) {
                setStatus({
                    type: 'error',
                    mensagem: response.data.message
                })
            } else {
                setStatus({
                    type: 'success',
                    mensagem: response.data.message
                })
                getAnuncios(); //CHAMA PRA ATT OS ANUNCIOS
            }
        })
        .catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Erro: tente novamente mais tarde!'
            })
        })
       
    }

  return (
    <div>
      <Container>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h1>Anuncio</h1>
                </div>
                <div className="p-2">
                    <Link to={"/cadastrar-anuncio"} className="btn btn-success btn-sm text-right"> Cadastrar Anúncio </Link>
                </div>
            </div>

            {/*vefificação se vai exibir mensagem de erro */}
            {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ''}  
            {/*vefificação se vai exibir mensagem de sucesso */}  
            {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ''} 

        <Table striped hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td className="text-center">
                            <Link to={"/visualizar-anuncio/"+item.id} className="btn btn-outline-primary btn-sm m-1">Visualizar</Link>
                            <Link to={"/editar-anuncio/"+item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                            <span className="btn btn-outline-danger btn-sm m-1" onClick={() => apagarAnuncio(item.id)}>Apagar</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </Container>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
import { Link } from "react-router-dom";
import { Container, Alert } from "reactstrap";

export const VisualizarAnuncio = (props) => { // (props) para receber id

    const [data, setData] = useState([]); //receber os dados da tabela via props

    const [id] = useState(props.match.params.id); //recebendo id

    const [status, setStatus] = useState({ //mensagem de erro
        type: '',
        mensagem: ''
    })

    const [dataImg, setDataImg] = useState();

    useEffect(() => {
        const getAnuncio = async () => {
            await axios
                .get(api + "/visualizar/" + id)
                .then((response) => {
                    // console.log(response.data.anuncio);
                    setData(response.data.anuncio);
                    setDataImg(response.data.endereco_imagem)
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
                        <h1>Visualizar Anuncio</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/"} className="btn btn-outline-info btn-sm text-right m-1">Listar</Link>
                        <Link to={"/editar-anuncio/"+data.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                        <Link to={"/editar-anuncio-img/"+data.id} className="btn btn-outline-primary btn-sm m-1">Editar Imagem</Link>
                    </div>
                </div>
                <hr className="m-1" />

                {/*vefificação se vai exibir mensagem de erro ou nao*/}
                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ''}    

                <dl className="row">
                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">{<img src={dataImg} alt="Anuncio imagem" width="150" height="150" />}</dd>

                    <dt className="col-sm-3">ID</dt>
                    <dd className="col-sm-9">{data.id}</dd>

                    <dt className="col-sm-3">Título</dt>
                    <dd className="col-sm-9">{data.titulo}</dd>

                    <dt className="col-sm-3">Descrição</dt>
                    <dd className="col-sm-9">{data.descricao}</dd>
                </dl>
            </Container>
        </div>
    );
};

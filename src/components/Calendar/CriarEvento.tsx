import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

interface ICriarEvento {
  abrirEvento: boolean;
  handleFecharEvento: () => void;
  onCriarEvento: (evento: {
    title: string;
    start: Date;
    end: Date;
  }) => void;
}

const CriarEvento: React.FC<ICriarEvento> = ({
  abrirEvento,
  handleFecharEvento,
  onCriarEvento,
}) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  const fim = new Date(now);
  fim.setMinutes(fim.getMinutes() + 30);

  const dataHoje = now.toISOString().split("T")[0]; // ex: 2025-07-07
  const horaAgora = now.toTimeString().slice(0, 5); // ex: 14:23
  const datahoraFim = fim.toTimeString().slice(0, 5); // retorna "HH:MM"

  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState(dataHoje);
  const [horaInicio, setHoraInicio] = useState(horaAgora);
  const [dataFim, setDataFim] = useState(dataHoje);
  const [horaFim, setHoraFim] = useState(datahoraFim);

  const handleSalvar = () => {
    if (!titulo || !dataInicio || !horaInicio || !dataFim || !horaFim) {
      alert("Preencha todos os campos.");
      return;
    }

    const inicio = new Date(`${dataInicio}T${horaInicio}`);
    const fim = new Date(`${dataFim}T${horaFim}`);
    const agora = new Date();

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      alert("Data ou hora inválida.");
      return;
    }

    if (inicio < agora) {
      alert("A data de início não pode ser no passado.");
      return;
    }

    if (inicio >= fim) {
      alert("A data de início deve ser antes da data de fim.");
      return;
    }

    onCriarEvento({
      title: titulo,
      start: inicio,
      end: fim,
    });

    // Resetar campos
    setTitulo("");
    setDataInicio(dataHoje);
    setHoraInicio(horaAgora);
    setDataFim(dataHoje);
    setHoraFim("");

    handleFecharEvento();
  };

  return (
    <Modal show={abrirEvento} onHide={handleFecharEvento} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Criar novo evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Reunião"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Hora de Início</Form.Label>
                <Form.Control
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Fim</Form.Label>
                <Form.Control
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Hora de Fim</Form.Label>
                <Form.Control
                  type="time"
                  value={horaFim}
                  onChange={(e) => setHoraFim(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleFecharEvento}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSalvar}>
          Criar Evento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CriarEvento;

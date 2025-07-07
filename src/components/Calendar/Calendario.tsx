import { useEffect, useState } from "react";
import type { Event } from "react-big-calendar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "./calendar.style.css";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CriarEvento from "./CriarEvento";

interface IEvento extends Event {
  id: string;
}


const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,    
  });

const DnDCalendar = withDragAndDrop(Calendar);

const Calendario: React.FC = () => {
  const [events, setEvents] = useState<IEvento[]>([]);
  const [abrirEvento, setAbrirEvento] = useState(false);

  const handleFecharEvento = () => setAbrirEvento(false);
  const handleAbrirEvento = () => setAbrirEvento(true);

  
  useEffect(() => {}, []);

  const handleCriarEvento = (evento: { title: string; start: Date; end: Date }) => {
  const novoEvento: IEvento = {
    id: Date.now().toString(),
    title: evento.title,
    start: evento.start,
    end: evento.end,
  };

  setEvents((prev) => [...prev, novoEvento]);
};


 const onEventResize: withDragAndDropProps["onEventResize"] = ({ event, start, end }) => {
  const updatedEvents = events.map((evt) => {
    if (evt.id === (event as IEvento).id) {
      return {
        ...evt,
        start: new Date(start),
        end: new Date(end),
      };
    }
    return evt;
  });

  setEvents(updatedEvents);
};


  const onEventDrop: withDragAndDropProps["onEventDrop"] = ({ event, start, end }) => {
  const updatedEvents: IEvento[] = [];

  for (let i = 0; i < events.length; i++) {
    const currentEvent = events[i];

    if (currentEvent.id === (event as IEvento).id) {
      // Atualiza o evento movido
      const updatedEvent: IEvento = {
        id: currentEvent.id,
        title: currentEvent.title,
        start: new Date(start),
        end: new Date(end),
      };
      updatedEvents.push(updatedEvent);
    } else {
      // Mantém os demais eventos iguais
      updatedEvents.push(currentEvent);
    }
  }

  setEvents(updatedEvents);
};


  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container">
          <div className="text-center mt-3">
          <button className="btn_green" onClick={handleAbrirEvento}>Criar novo evento</button>

          </div>
          <DnDCalendar
            defaultView="week"
             views={['month', 'week', 'day', 'agenda']}
            events={events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            style={{ width: "100%", height: "100vh" }}
          />
        </div>
       
      </div>
       <CriarEvento
          abrirEvento={abrirEvento}
           onCriarEvento={handleCriarEvento}
          handleFecharEvento={handleFecharEvento}
        />
    </div>
  );

  
};


export default Calendario;

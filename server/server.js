import express from 'express'
import morgan from 'morgan'

import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'
import data from './data.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



let db = {events:{}, filterList:[]};
let formattedData;

const saveToDb = (eventType, adaptedData, formattedEventType) => {
    if (db.events[eventType]) {
        db.events[eventType].push(adaptedData)
    } else {
        db.events[eventType] = [adaptedData]
        db.filterList.push(formattedEventType)
    }
}

const setInitialTableData = () => {
    formattedData = data.map((d) => {
        const formattedEventType = d.eventType
        .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (s) => s.toUpperCase());
        const adaptedData = { ...d, id: uuidv4(), formattedEventType };
        saveToDb(d.eventType, adaptedData, formattedEventType)
        return adaptedData;
    });
}

setInitialTableData()

app.get('/', (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.size);
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    formattedData.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    const paginatedData = formattedData.slice(startIndex, endIndex);
    
    res.json({
        page,
        pageSize,
        totalItems: formattedData.length,
        data: paginatedData,
        filterList: db.filterList
    });
});

app.post('/data/filter', (req, res) => {
    const { filterdTypes, page, size } = req.body   
    formattedData = [];
    if (filterdTypes && filterdTypes.length) { 
        for (let filterdType of filterdTypes) {
            const type = filterdType.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '')
            formattedData.push(...db.events[type])
        }
    } else {
        formattedData = []
        db = { events:{}, filterList:[]};
        setInitialTableData()
    }
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    formattedData.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    const paginatedData = formattedData.slice(startIndex, endIndex);
 
    res.json({
        page:pageIndex,
        pageSize,
        totalItems: formattedData.length,
        data: paginatedData,
        filterList: db.filterList
    });
});






export default app
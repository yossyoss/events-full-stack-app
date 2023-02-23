import { useState, useEffect } from 'react'
import Filter from './Filter'
import Error from './Error'
import DataTable from './DataTable'
import { fetchEvents, createPostSettings, postFilters } from '../utils/fetchEventData'

const TableWithFilter = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [events, setEvents] = useState({});
    const [error, setError] = useState(false)

    const getEventsData = async () => {
        try {
            const eventsData = await fetchEvents({ page, rowsPerPage })
            setEvents(eventsData)
        } catch (e) {
            setError(e);
        }
    };
    useEffect(() => {
        getEventsData()
    }, [page, rowsPerPage])

    const handleRowsCb = (rows) => {
        setRowsPerPage(rows)
    }

    const handlePageCb = (page) => {
        setPage(page)
    }
    const postFilterData = async (filterdTypes) => {
        try {
            const eventsData = await postFilters(filterdTypes, 0, rowsPerPage);
            setEvents(eventsData)
        } catch (e) {
            setError(e);
        }
    }

    const onFiltersClicked = (filterdTypes) => {
        postFilterData(filterdTypes)
    }

    if (error) {
        return (<Error>Error has been occurred while fetching data. please try again later</Error>)
    }

    return (
        <>
            <div className="filter">
                <Filter onFiltersClicked={onFiltersClicked} events={events} />
            </div>
            <DataTable
                events={events}
                page={page}
                rowsPerPage={rowsPerPage}
                handlePageCb={handlePageCb}
                handleRowsCb={handleRowsCb}
            />
        </>
    )
}
export default TableWithFilter
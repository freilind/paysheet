import cuid from 'cuid';
import React from 'react';
import { Table } from 'semantic-ui-react';
import {getMonthName, months, monthsTitle} from '../../app/common/constants';

const PaysheetUs = ({students}) => {
    const styleMoroso = {'backgroundColor' : '#F8D8DF'};
    const styleSolvente = {'backgroundColor' : '#D3F8D7'};
    const regexMiles = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const todayMonth = getMonthName();
    const getTodayMonth = (m) => m.month === todayMonth;
    const size = months.findIndex(getTodayMonth) + 1;
    let totMonths = [];
    months.map(m => totMonths.push({'month': m.month, 'sum': 0}));

    const reducer = (accumulator, currentValue) => Number(accumulator + currentValue);
    const extractor = (obj) => obj.transactions.map(month => Number(month.mount)).reduce(reducer,0);
    const extractorCuote = (obj => Number(obj.cuote));
    
    const extraxtSum = (student, month) => {
        const m = student.payments.filter(obj => obj.month === month).map(extractor);
        const sum = totMonths.filter(obj => obj.month === month).map(obj => obj.sum);
        const updateMonth =[{'month': month, 'sum': Number(sum) + Number(m)}];
        totMonths = totMonths.map(obj => updateMonth.find(o => o.month === obj.month) || obj);
    }

    students.sort((a, b) => a.lastName >= b.lastName).map(student => months.map(m =>extraxtSum(student, m.month)));
    const acc = months.slice(0, size).map(extractorCuote).reduce(reducer,0);

    return(
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {monthsTitle.map(title =>
                            <Table.HeaderCell key={title} singleLine>
                                {title}
                            </Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {students.map(student => {
                        const accStudent = student.payments.map(extractor).reduce(reducer,0);
                        return (
                            <Table.Row key={student.cedula}>
                                <Table.Cell singleLine >
                                    <a href={`/students/${student.id}`}>{student.cedula.toString().replace(regexMiles, '.')}</a>
                                </Table.Cell>
                                <Table.Cell style={{textTransform: 'capitalize'}} singleLine>
                                    {student.lastName +', '+ student.firstName}
                                </Table.Cell>
                                <Table.Cell  style={accStudent < acc ? styleMoroso : styleSolvente}>
                                    {accStudent < acc ? 'Moroso' : 'Solvente'}
                                </Table.Cell>
                                {months.map(m =>  {
                                    const sumMonth = Number(student.payments.filter(obj => obj.month === m.month).map(extractor));
                                    return (
                                        <Table.Cell key={m.month} style={sumMonth < m.cuote ? styleMoroso : styleSolvente}>
                                            {sumMonth}
                                        </Table.Cell>
                                    );
                                })}
                                <Table.Cell>{accStudent}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row >
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>TOTALES</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        {months.map(m => 
                            <Table.HeaderCell key={cuid()}>
                                {totMonths.filter(obj => obj.month === m.month).map(obj => obj.sum)}
                            </Table.HeaderCell>
                        )}
                        <Table.HeaderCell>{totMonths.map(obj => obj.sum).reduce(reducer,0)}</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
}

export default PaysheetUs;

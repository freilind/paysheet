import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import {getMonthName, monthsCuote, monthsTitle} from '../../app/common/constants';

const PaysheetBs = ({students}) => {
    const {payments} = useSelector(state => state.payment);
    const styleMoroso = {'backgroundColor' : '#F8D8DF'};
    const styleSolvente = {'backgroundColor' : '#D3F8D7'};
    const regexMiles = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;

    const todayMonth = getMonthName();
    let totalMonths = {};
    let totalClassroom = 0;
    monthsCuote.forEach(m => (totalMonths = {...totalMonths,[m.month]: 0}));

    students.sort((a, b) => a.lastName >= b.lastName);

    const calcPayments = (student) => {
        let totalStudentMonths = {};
        monthsCuote.forEach(m => (totalStudentMonths = {...totalStudentMonths,[m.month]: 0}));
        const payInd = payments.filter(p => p.studentId === student.id).sort((a, b) => a.date <= b.date);
        payInd.forEach(p => {
            let feePay = parseFloat(p.mount * p.rate);
            monthsCuote.some(m => {
                const accStudent = totalStudentMonths[m.month];
                const sum = accStudent + feePay;
                if(sum <= (m.cuote * p.rate)) {
                    totalStudentMonths[m.month] = sum;
                    totalMonths[m.month] = totalMonths[m.month] + feePay;
                    feePay -= feePay;
                }else {
                    let resto = (m.cuote * p.rate) - accStudent;
                    totalStudentMonths[m.month] = accStudent + resto;
                    totalMonths[m.month] = totalMonths[m.month] + resto;
                    feePay -= resto;
                }
                return feePay === 0;
            });
        });
        return totalStudentMonths;
    };

    const calcDelayed = (student) => {
        let delayedMonths = {};
        monthsCuote.forEach(m => (delayedMonths = {...delayedMonths,[m.month]: 0}));
        const payInd = payments.filter(p => p.studentId === student.id).sort((a, b) => a.date <= b.date);
        payInd.forEach(p => {
            let feePay = parseFloat(p.mount);
            monthsCuote.some(m => {
                const accStudent = delayedMonths[m.month];
                const sum = accStudent + feePay;
                if(sum <= m.cuote) {
                    delayedMonths[m.month] = sum;
                    feePay -= feePay;
                }else {
                    let resto = m.cuote - accStudent;
                    delayedMonths[m.month] = accStudent + resto;
                    feePay -= resto;
                }
                return feePay === 0;
            });
        });
        return delayedMonths;
    };

    const handleDelayed = (paysDollar) => {
        const fee = paysDollar[todayMonth];
        const monthFee = monthsCuote.filter(m => m.month === todayMonth).map(obj => obj.cuote);
        return fee < monthFee;
    }

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
                        const paysStudent = calcPayments(student);
                        const paysDollar = calcDelayed(student);
                        const delayed = handleDelayed(paysDollar);
                        let totalStudent = 0;
                        return (
                            <Table.Row key={student.cedula}>
                                <Table.Cell singleLine >
                                    <a href={`/students/${student.id}`}>{student.cedula.toString().replace(regexMiles, '.')}</a>
                                </Table.Cell>
                                <Table.Cell style={{textTransform: 'capitalize'}} singleLine>
                                    {student.lastName +', '+ student.firstName}
                                </Table.Cell>
                                <Table.Cell  style={delayed ? styleMoroso : styleSolvente}>
                                    {delayed ? 'Moroso' : 'Solvente'}
                                </Table.Cell>
                                {monthsCuote.map(m => {
                                    totalStudent += paysStudent[m.month];
                                    return (
                                        <Table.Cell key={m.month} style={paysDollar[m.month] < m.cuote ? styleMoroso : styleSolvente}>
                                            {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                .format(paysStudent[m.month]).replace('BSF', '')}
                                        </Table.Cell>
                                    );
                                })}
                                <Table.Cell>
                                    {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                .format(totalStudent).replace('BSF', '')}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row >
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>TOTALES</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        {monthsCuote.map(m => {
                            totalClassroom += totalMonths[m.month]
                            return(
                                <Table.HeaderCell key={cuid()}>
                                    {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                .format(totalMonths[m.month]).replace('BSF', '')}
                                </Table.HeaderCell>
                            );
                        })}
                        <Table.HeaderCell>
                            {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                .format(totalClassroom).replace('BSF', '')}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
}

export default PaysheetBs;

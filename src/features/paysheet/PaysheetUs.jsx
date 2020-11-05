import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import {getMonthName, monthsCuote, monthsTitle} from '../../app/common/constants';

const PaysheetUs = ({students}) => {
    let pays;
    const {payments, paymentsStudent} = useSelector(state => state.payment);
    students.length === 1 ? pays = paymentsStudent : pays = payments
   // const {payments} = useSelector(state => state.payment);
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
        const payInd = pays.filter(p => p.studentId === student.id).sort((a, b) => a.date <= b.date);
        payInd.forEach(p => {
            let feePay = parseFloat(p.mount);
            monthsCuote.some(m => {
                const accStudent = totalStudentMonths[m.month];
                const sum = accStudent + feePay;
                if(sum <= m.cuote) {
                    totalStudentMonths[m.month] = sum;
                    totalMonths[m.month] = totalMonths[m.month] + feePay;
                    feePay -= feePay;
                }else {
                    let resto = m.cuote - accStudent;
                    totalStudentMonths[m.month] = accStudent + resto;
                    totalMonths[m.month] = totalMonths[m.month] + resto;
                    feePay -= resto;
                }
                return feePay === 0;
            });
        });
        return totalStudentMonths;
    };

    const calcDelayed = (paysStudent) => {
        const fee = paysStudent[todayMonth];
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
                        const delayed = calcDelayed(paysStudent);
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
                                        <Table.Cell key={m.month} style={paysStudent[m.month] < m.cuote ? styleMoroso : styleSolvente}>
                                            {paysStudent[m.month]}
                                        </Table.Cell>
                                    );
                                })}
                                <Table.Cell>{totalStudent}</Table.Cell>
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
                                    {totalMonths[m.month]}
                                </Table.HeaderCell>
                            );
                        })}
                        <Table.HeaderCell>{totalClassroom}</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
}

export default PaysheetUs;

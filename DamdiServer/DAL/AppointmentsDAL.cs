using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class AppointmentsDAL
    {
        private readonly string conStr;
        public AppointmentsDAL(string conStr)
        {
            this.conStr = conStr;
        }
        /*Create a new appointment in Appointments table*/
        public int SetNewAppointment(Appointments app)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewAppointment", con);//Create proc!!!
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Station_code", SqlDbType.Int).Value = app.Station_code;
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = app.Personal_id;
                    cmd.Parameters.AddWithValue("@App_time", SqlDbType.DateTime).Value = app.App_time;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
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
                    SqlCommand cmd = new SqlCommand("InsertNewAppointment", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@station_code", SqlDbType.Int).Value = app.Station_code;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = app.Personal_id;
                    cmd.Parameters.AddWithValue("@app_time", SqlDbType.DateTime).Value = Convert.ToDateTime(app.App_time);
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Appointments GetUserAppointment(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    Appointments existApp = null;
                    SqlCommand cmd = new SqlCommand("GetInfoAppById", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = user.Personal_id;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        existApp = new Appointments(
                            Convert.ToInt32(reader["app_id"]),
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["app_time"]),
                            Convert.ToBoolean(reader["cinfirm_1"]),
                            Convert.ToBoolean(reader["cinfirm_2"]),
                            Convert.ToBoolean(reader["cinfirm_3"])
                            );
                    }
                    return existApp;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Appointments> GetAppointmentsListFirstPos()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    var appointments = new List<Appointments>();
                    Appointments a = null;
                    SqlCommand cmd = new SqlCommand("GetAppointmentsPosOne", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        a = new Appointments(
                            Convert.ToInt32(reader["app_id"]),
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["app_time"]),
                            Convert.ToBoolean(reader["confirm_1"]),
                            Convert.ToBoolean(reader["confirm_2"]),
                            Convert.ToBoolean(reader["confirm_3"])
                            );
                        appointments.Add(a);
                    }
                    return appointments;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Appointments> GetAppointmentsListSecondPos()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    var appointments = new List<Appointments>();
                    Appointments a = null;
                    SqlCommand cmd = new SqlCommand("GetAppointmentsPosTwo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        a = new Appointments(
                            Convert.ToInt32(reader["app_id"]),
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["app_time"]),
                            Convert.ToBoolean(reader["confirm_1"]),
                            Convert.ToBoolean(reader["confirm_2"]),
                            Convert.ToBoolean(reader["confirm_3"])
                            );
                        appointments.Add(a);
                    }
                    return appointments;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Appointments> GetAppointmentsListThirdPos()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    var appointments = new List<Appointments>();
                    Appointments a = null;
                    SqlCommand cmd = new SqlCommand("GetAppointmentsPosThree", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        a = new Appointments(
                            Convert.ToInt32(reader["app_id"]),
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["app_time"]),
                            Convert.ToBoolean(reader["confirm_1"]),
                            Convert.ToBoolean(reader["confirm_2"]),
                            Convert.ToBoolean(reader["confirm_3"])
                            );
                        appointments.Add(a);
                    }
                    return appointments;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int DeleteExistApp(Appointments app)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("DeleteExistAppointment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@appId", SqlDbType.NVarChar).Value = app.App_id;
                int res = cmd.ExecuteNonQuery();
                return res;
            }
        }
    }
}
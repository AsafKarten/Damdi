using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class StationsDAL
    {
        private readonly string conStr;
        public StationsDAL(string conStr)
        {
            this.conStr = conStr;
        }
        /*Create a new station in Stations table*/
        public int SetNewStation(Stations station)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewStation", con);//need to create proc!!!
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Station_code", SqlDbType.Int).Value = station.Station_code;
                    cmd.Parameters.AddWithValue("@City", SqlDbType.NVarChar).Value = station.City;
                    cmd.Parameters.AddWithValue("@Address", SqlDbType.NVarChar).Value = station.Address;
                    cmd.Parameters.AddWithValue("@Start_time", SqlDbType.DateTime).Value = station.Start_time;
                    cmd.Parameters.AddWithValue("@End_time", SqlDbType.DateTime).Value = station.End_time;
                    cmd.Parameters.AddWithValue("@Lat", SqlDbType.Float).Value = station.Lat;
                    cmd.Parameters.AddWithValue("@Lng", SqlDbType.Float).Value = station.Lng;
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
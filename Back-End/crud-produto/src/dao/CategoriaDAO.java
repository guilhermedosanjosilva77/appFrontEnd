package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Categoria;
import util.ConnectionFactory;

public class CategoriaDAO {

    //======================================//
    // READ
    //======================================//
    public List<Categoria> buscarTodos() {
        
        List<Categoria> categorias = new ArrayList<>();

        String sql = "SELECT * FROM categorias";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery();) {
            
            while(rs.next()) {
                Categoria categoria = new Categoria(
                    rs.getLong("id"),
                    rs.getString("nome"));
                categorias.add(categoria);
            }
        } catch (Exception e) {
           System.err.println("Erro ao buscar categorias: " + e.getMessage());
           e.printStackTrace();
        }
        return categorias;
    }

      //======================================//
    // READ BY ID
    //======================================//
    public Categoria buscarPorId(Long id) {

        Categoria categoria = null;

        String sql = "SELECT id, nome FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    categoria = new Categoria(
                     rs.getLong("id"),
                     rs.getString("nome"));
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar categoria por ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
        return categoria;
    }



    //======================================//
    // CREATE
    //======================================//
    public void inserir(Categoria categoria) {

        // usa Statement.RETURN_GENERATED_KEYS para solicitar o ID gerado
        String sql = "INSERT INTO categorias (nome) VALUES (?)";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, categoria.getNome());

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    // define o ID no objeto Produto que foi passado (importante para a API)
                    categoria.setId(rs.getLong(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir categoria: " + categoria.getNome() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------
    // UPDATE (CORRIGIDO) ✅
    // ------------------------------------
    public void atualizar(Categoria categoria) {

        // CORREÇÃO 1: Deve atualizar a tabela 'categorias', não 'produtos'
        String sql = "UPDATE categorias SET nome = ? WHERE id = ?"; 

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            // define os parâmetros (os novos valores)
            // 1º Parâmetro: nome
            stmt.setString(1, categoria.getNome()); 
            
            // CORREÇÃO 2: O ID é o 2º parâmetro (WHERE id = ?)
            stmt.setLong(2, categoria.getId()); 

            // executa a atualização
            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Categoria ID " + categoria.getId() + " atualizado. Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            // Mensagem de erro ajustada para Categoria
            System.err.println("Erro ao atualizar categoria ID: " + categoria.getId() + ". Detalhes: " + e.getMessage()); 
            e.printStackTrace();
        }
    }


    // ------------------------------------
    // DELETE
    // ------------------------------------
    public void deletar(Long id) throws SQLIntegrityConstraintViolationException {

        String sql = "DELETE FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            // executa a exclusão
            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Tentativa de deletar Categoria ID " + id + ". Linhas afetadas: " + linhasAfetadas);


        } catch(SQLIntegrityConstraintViolationException e) {
            throw new SQLIntegrityConstraintViolationException();
        } 
        
        catch (SQLException e) {
            System.err.println("Erro ao deletar categoria ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
            throw new SQLIntegrityConstraintViolationException();
        }
    }
}
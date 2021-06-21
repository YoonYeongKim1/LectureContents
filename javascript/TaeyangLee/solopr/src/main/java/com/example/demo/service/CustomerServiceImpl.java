package com.example.demo.service;

import com.example.demo.entity.Board;
import com.example.demo.entity.Customer;
import com.example.demo.repository.BoardRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService{
   @Autowired
   private CustomerRepository customerRepository;


    @Override
    public void join(Customer customer) throws Exception {
        customerRepository.create(customer);
    }
}

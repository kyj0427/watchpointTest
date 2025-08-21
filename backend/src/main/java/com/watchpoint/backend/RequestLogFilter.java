package com.watchpoint.backend;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(-101) // 시큐리티 필터보다 앞으로
@Slf4j
public class RequestLogFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, java.io.IOException {
    log.info("[REQ] {} {} (Origin:{}, Host:{})",
      req.getMethod(), req.getRequestURI(), req.getHeader("Origin"), req.getHeader("Host"));
    chain.doFilter(req, res);
  }
}

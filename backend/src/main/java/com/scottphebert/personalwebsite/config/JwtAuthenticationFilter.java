package com.scottphebert.personalwebsite.config;

import com.scottphebert.personalwebsite.common.Constants;
import com.scottphebert.personalwebsite.service.security.JWTBlacklistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private JWTBlacklistService jwtBlacklistService;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getToken(request);
        //check if token ias been invalidated
        if(token != null && jwtBlacklistService.isBlackListed(token)){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write(Constants.TOKEN_INVALIDATED);
        }
        else if (token != null && jwtTokenProvider.validateToken(token)){
            String username = jwtTokenProvider.getUsernameFromToken(token);
            // Set the authentication in the Spring Security context
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    // Extract JWT token from the "Authorization" header
    public String getToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()){
                if (Constants.AUTH_TOKEN.equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}


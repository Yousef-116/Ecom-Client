import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  personalInfo = {
    name: 'Yousef Mostafa Elbeny',
    email: 'yousef.com1162003@gmail.com',
    location: 'Cairo, Egypt',
    phone: '+02 1153610783',
    linkedin: 'https://www.linkedin.com/in/yousefmostafa116/',
    github: 'https://github.com/Yousef-116',
    summary: 'I am a Computer Science graduate skilled in developing RESTful APIs with ASP.NET Core and EF Core. Experienced in implementing secure authentication using JWT and establishing robust error handling. Passionate about backend development and clean code practices. I am currently learning Angular Framework for Frontend.',
    education: {
      degree: 'Bachelor of Computer and Information Sciences',
      period: '2021-2025',
      university: 'Faculty of Computer and Information Sciences (FCIS), Ain Shams University (ASU)',
      gpa: '3.6 (Very Good Overall grade)'
    },
    skills: [
      {
        category: 'Backend Development',
        items: ['C#', 'ASP.NET Core', 'RESTful API', 'Versioning', 'OpenAPI/Swagger', 'Middleware', 'Filters', 'Validation', 'Dependency Injection', 'Observability', 'Logging', 'Performance Optimization', 'Exception Handling']
      },
      {
        category: 'Databases',
        items: ['SQL Server', 'MySQL', 'SQLite', 'Oracle Database', 'Firebase', 'Entity Framework Core', 'LINQ']
      },
      {
        category: 'DevOps & Tools',
        items: ['Git/GitHub', 'Visual Studio', 'VS Code', 'Postman', '.NET CLI', 'Angular CLI']
      },
      {
        category: 'Frontend Development',
        items: ['Angular (Currently learning)', 'HTML', 'CSS', 'TypeScript', 'JavaScript', 'Bootstrap', 'Razor Views']
      },
      {
        category: 'Software Architectures',
        items: ['Clean Architecture', 'Microservices Fundamentals', 'Repository Pattern', 'Unit of Work', 'Result Pattern', 'SOLID Principles', 'Design Patterns', 'OOP', 'DRY', 'KISS']
      },
      {
        category: 'Core Concepts',
        items: ['Data Structures', 'Algorithms', 'Caching Strategies', 'API Security (JWT, Refresh Token)']
      },
      {
        category: 'Soft Skills',
        items: ['Problem-Solving', 'Self-Learning', 'Team Collaboration']
      }
    ]
  };
}
